import { EngineConfig } from "./engine-config";

export interface GameConfig {
    inputType: 'keyboard' | 'touch'; //default: 'keyboard'
    renderMode: 'canvas' | 'webgl'; //default: 'canvas'
    engineConfig?: EngineConfig;
}