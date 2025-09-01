import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IconSun, IconUserCheck, IconCalendar } from "@tabler/icons-react";

export function Welcome({ userName }: { userName: string }) {
  return (
    <Card className="bg-gradient-to-r from-primary/50 to-white dark:from-primary/50 dark:to-secondary/10 shadow-md">
      <CardHeader>
        <CardDescription className="text-muted-foreground">
          Welcome back,
        </CardDescription>
        <CardTitle className="text-3xl font-bold">
          {userName} <IconSun className="inline size-6 ml-2 mb-2 text-yellow-400" />
        </CardTitle>
        <CardAction>
          <Badge variant="secondary">
            <IconUserCheck className="size-4 mr-1" />
            Verified User
          </Badge>
        </CardAction>
      </CardHeader>
      <CardFooter className="flex-col items-start gap-2 text-sm">
        <div className="line-clamp-2 text-muted-foreground">
          Check any today's updates.
        </div>
        <div className="flex items-center gap-2 font-medium">
          <IconCalendar className="size-4 text-blue-500" />
          Have a productive day!
        </div>
      </CardFooter>
    </Card>
  );
}
