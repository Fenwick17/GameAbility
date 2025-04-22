export interface AccessibilityFeatureLevel {
  level: 'basic' | 'advanced' | 'customizable';
  notes?: string;
}

export interface AccessibilityFeature {
  key: string;
  name: string;
  levelInfo: AccessibilityFeatureLevel;
}

export interface AccessibilityCategory {
  category: 'visual' | 'controls' | 'audio' | 'cognitive' | 'gameplay';
  features: AccessibilityFeature[];
}

export interface Game {
  id: number;
  title: string;
  platforms: string[];
  genre: string;
  accessibility: AccessibilityCategory[];
}
