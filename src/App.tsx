/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/


import React, { useEffect, useRef, useState } from 'react';
import { VoxelEngine } from './engine/VoxelEngine';
import { Generators } from './utils/generators';
import { UIOverlay } from './components/UIOverlay';
import { LandingScreen } from './components/LandingScreen';
import { PromptModal } from './components/PromptModal';
import { WelcomeScreen } from './components/WelcomeScreen';
import { ApplicationPage } from './components/ApplicationPage';
import { AppState, SavedModel, VoxelData } from './types';
import { GoogleGenAI, Type } from '@google/genai';

const INITIAL_MODEL = 'University of Miami';

const App: React.FC = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<VoxelEngine | null>(null);

  // App State
  const [appState, setAppState] = useState<AppState>(AppState.INTRO);
  const [voxelCount, setVoxelCount] = useState(0);
  const [currentBaseModel, setCurrentBaseModel] = useState<string>(INITIAL_MODEL);
  
  // Custom builds storage
  const [customBuilds, setCustomBuilds] = useState<SavedModel[]>([]);
  const [customRebuilds, setCustomRebuilds] = useState<SavedModel[]>([]);
  
  // UI State
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [isInfoVisible, setIsInfoVisible] = useState(false);
  const [isPromptOpen, setIsPromptOpen] = useState(false);
  const [promptMode, setPromptMode] = useState<'create' | 'morph'>('create');
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    if (!mountRef.current) return;

    // Initialize Engine
    const engine = new VoxelEngine(
        mountRef.current, 
        setAppState,
        setVoxelCount
    );
    engineRef.current = engine;

    // Load initial model (UTD Campus)
    const initialData = Generators[INITIAL_MODEL]();
    engine.loadInitialModel(initialData);

    // Handle Resize
    const handleResize = () => engine.handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
        window.removeEventListener('resize', handleResize);
        engine.cleanup();
    };
  }, []);

  const handleStartDrop = () => {
      engineRef.current?.triggerSkydive();
      // Wait for skydive animation to finish (it updates AppState to STABLE automatically)
  };

  const handleDismantle = () => {
      engineRef.current?.dismantle();
      // Transition to Application Page after explosion animation
      setTimeout(() => {
          setAppState(AppState.APPLICATION_PAGE);
      }, 1500);
  };

  const handleRebuild = (type: 'University of Miami' | 'TexasAM' | 'Eagle' | 'Cat') => {
      // If we are resetting to a default model, generate it
      // Note: Rebuilding transforms existing voxels into new shape
      // This works best if the voxel count is somewhat similar, or we might have leftovers/gaps
      const targetData = Generators[type]();
      engineRef.current?.rebuild(targetData);
      setCurrentBaseModel(type);
  };

  const handleNewScene = (type: 'Eagle') => {
      // Completely resets the scene
      const data = Generators[type]();
      engineRef.current?.loadInitialModel(data);
      setCurrentBaseModel(type);
      setAppState(AppState.STABLE);
  };

  const handleSelectCustomBuild = (model: SavedModel) => {
      engineRef.current?.loadInitialModel(model.data);
      setCurrentBaseModel(model.name);
  };

  const handleSelectCustomRebuild = (model: SavedModel) => {
      engineRef.current?.rebuild(model.data);
      setCurrentBaseModel(model.name);
  };

  const handlePromptSubmit = async (prompt: string) => {
      if (!process.env.API_KEY) {
          alert("API Key is missing. Please configure it in Vercel Settings.");
          return;
      }
      
      setIsGenerating(true);
      
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        const schema = {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    x: { type: Type.NUMBER },
                    y: { type: Type.NUMBER },
                    z: { type: Type.NUMBER },
                    color: { type: Type.NUMBER, description: "Hex color integer" }
                }
            }
        };

        const modelName = 'gemini-3-flash-preview';
        const systemPrompt = `
        You are a Voxel Architect. 
        Generate a JSON array of voxel data (x, y, z, color) for the requested object.
        Coordinates should be roughly centered around 0,0,0.
        Y should be >= 0 (floor is roughly -10, but keep models grounded at y=0 or higher if flying).
        Use approximately 500-1500 voxels for detailed models.
        Colors should be varied and realistic.
        Output ONLY the JSON.
        `;

        const response = await ai.models.generateContent({
            model: modelName,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: schema,
                systemInstruction: systemPrompt
            }
        });

        const jsonText = response.text;
        if (!jsonText) throw new Error("No data returned");
        
        const data = JSON.parse(jsonText) as VoxelData[];
        
        // Save history
        const newModel: SavedModel = { name: prompt, data };

        if (promptMode === 'create') {
            setCustomBuilds(prev => [newModel, ...prev]);
            engineRef.current?.loadInitialModel(data);
            setCurrentBaseModel(prompt);
        } else {
            setCustomRebuilds(prev => [newModel, ...prev]);
            engineRef.current?.rebuild(data);
        }

      } catch (error) {
          console.error("Generation failed:", error);
          alert("Failed to generate model. Please try again.");
      } finally {
          setIsGenerating(false);
      }
  };

  // Utilities
  const toggleRotation = () => {
      const newState = !isAutoRotate;
      setIsAutoRotate(newState);
      engineRef.current?.setAutoRotate(newState);
  };

  const exportJson = () => {
      const json = engineRef.current?.getJsonData();
      if (!json) return;
      const blob = new Blob([json], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `voxel-model-${Date.now()}.json`;
      a.click();
  };

  const importJson = () => {
      const input = document.createElement('input');
      input.type = 'file';
      input.accept = 'application/json';
      input.onchange = (e) => {
          const file = (e.target as HTMLInputElement).files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = (ev) => {
              try {
                  const data = JSON.parse(ev.target?.result as string);
                  if (Array.isArray(data)) {
                       // Normalize format if needed (map 'c' to 'color' etc)
                       const formatted = data.map((v: any) => ({
                           x: v.x, y: v.y, z: v.z,
                           color: typeof v.color === 'number' ? v.color : parseInt(v.c.replace('#', ''), 16)
                       }));
                       const name = file.name.replace('.json', '');
                       const model = { name, data: formatted };
                       setCustomBuilds(prev => [model, ...prev]);
                       engineRef.current?.loadInitialModel(formatted);
                       setCurrentBaseModel(name);
                  }
              } catch (err) {
                  alert("Invalid JSON file");
              }
          };
          reader.readAsText(file);
      };
      input.click();
  };

  return (
    <div className="relative w-full h-screen bg-slate-900 overflow-hidden">
        {/* 3D Canvas */}
        <div ref={mountRef} className="w-full h-full" />

        {/* Intro Screen */}
        <LandingScreen 
            visible={appState === AppState.INTRO}
            onStart={handleStartDrop}
        />

        {/* Main UI */}
        <UIOverlay 
            voxelCount={voxelCount}
            appState={appState}
            currentBaseModel={currentBaseModel}
            customBuilds={customBuilds}
            customRebuilds={customRebuilds}
            isAutoRotate={isAutoRotate}
            isInfoVisible={isInfoVisible}
            isGenerating={isGenerating}
            onDismantle={handleDismantle}
            onRebuild={handleRebuild}
            onNewScene={handleNewScene}
            onSelectCustomBuild={handleSelectCustomBuild}
            onSelectCustomRebuild={handleSelectCustomRebuild}
            onPromptCreate={() => { setPromptMode('create'); setIsPromptOpen(true); }}
            onPromptMorph={() => { setPromptMode('morph'); setIsPromptOpen(true); }}
            onShowJson={exportJson}
            onImportJson={importJson}
            onToggleRotation={toggleRotation}
            onToggleInfo={() => setIsInfoVisible(!isInfoVisible)}
        />

        {/* Application Page */}
        <ApplicationPage visible={appState === AppState.APPLICATION_PAGE} />

        <WelcomeScreen visible={isInfoVisible} />

        <PromptModal 
            isOpen={isPromptOpen}
            mode={promptMode}
            onClose={() => setIsPromptOpen(false)}
            onSubmit={handlePromptSubmit}
        />
    </div>
  );
};

export default App;