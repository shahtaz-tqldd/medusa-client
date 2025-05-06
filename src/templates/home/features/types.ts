export interface FeatureProps{
    title: string;
    text: string;
    icon?: React.ComponentType<{ className?: string; strokeWidth?: number }>;
}