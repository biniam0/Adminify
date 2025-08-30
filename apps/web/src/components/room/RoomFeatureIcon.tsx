export const RoomFeatureIcon = ({
  icon: Icon,
  label,
}: {
  icon: any;
  label: string;
}) => {
  return (
    <div className="flex items-center gap-1 text-xs text-muted-foreground">
      <Icon className="h-4 w-4 text-primary" />
      <span>{label}</span>
    </div>
  );
};
