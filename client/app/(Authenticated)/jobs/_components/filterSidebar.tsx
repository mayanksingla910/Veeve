import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

function FilterSidebar() {
  return (
    <Card className="sticky top-24 border-muted/60 shadow-sm overflow-hidden">
      <CardHeader>
        <CardTitle className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Filters
        </CardTitle>
      </CardHeader>
      <CardContent className="h-[400px] p-4 text-sm text-muted-foreground italic">
        Filter options coming soon...
      </CardContent>
    </Card>
  );
}

export default FilterSidebar;