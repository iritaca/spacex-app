export interface iconInstanceProps {
  className?: string;
  size?: "sm" | "lg";
}

export interface IconProps extends iconInstanceProps {
  children: React.ReactNode;
}
