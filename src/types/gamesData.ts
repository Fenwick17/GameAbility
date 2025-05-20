export interface AccessibilityFeatureLevel {
  level: "basic" | "advanced" | "customizable";
  notes?: string;
}

export interface AccessibilityFeature {
  key: string;
  name: string;
  levelInfo: AccessibilityFeatureLevel;
}

export interface AccessibilityCategory {
  category: "visual" | "controls" | "audio" | "cognitive" | "gameplay";
  features: AccessibilityFeature[];
}

type PlatformInfo = {
  platform: {
    id: number;
    name: string;
    slug: string;
  };
};

export interface Game {
  id: number;
  name: string;
  platforms: PlatformInfo[];
  genre: string;
  accessibility: AccessibilityCategory[];
}
