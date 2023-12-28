type ContainerProps = {
  children: React.ReactNode;
};

export function Container({ children }: ContainerProps) {
  return <div className="container max-w-xl m-auto px-4">{children}</div>;
}

export function WideContainer({ children }: ContainerProps) {
  return <div className="container max-w-5xl m-auto px-4">{children}</div>;
}
