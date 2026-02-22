"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { RotateCcw } from "lucide-react";
import JobPostButtons from "./jobPostButtons";

const filterOptions = [
  {
    category: "Payout",
    options: [
      { name: "Greater than ₹30k", value: "30000" },
      { name: "Greater than ₹10k", value: "10000" },
      { name: "Greater than ₹5k", value: "5000" },
      { name: "Greater than ₹3k", value: "3000" },
      { name: "Greater than ₹1k", value: "1000" },
    ],
  },
  {
    category: "Location",
    options: [
      { name: "Remote", value: "remote" },
      { name: "Onsite", value: "onsite" },
      { name: "Hybrid", value: "hybrid" },
    ],
  },
  {
    category: "Type",
    options: [
      { name: "Full Time", value: "full-time" },
      { name: "Part Time", value: "part-time" },
      { name: "Contract", value: "contract" },
    ],
  },
  {
    category: "Edit Type",
    options: [
      { name: "Documentary", value: "documentary" },
      { name: "Motion Graphics", value: "motion-graphics" },
      { name: "Short Films", value: "short-films" },
      { name: "Color Grading", value: "color-grading" },
      { name: "Clothing", value: "clothing" },
      { name: "Gym", value: "gym" },
      { name: "Product Promo", value: "product-promo" },
      { name: "Saas promo", value: "saas-promo" },
      { name: "Short Form Video", value: "short-form-video" },
      { name: "Long Form Video", value: "long-form-video" },
    ],
  },
  {
    category: "Software",
    options: [
      { name: "Adobe Premiere Pro", value: "adobe-premiere-pro" },
      { name: "DaVinci Resolve", value: "davinci-resolve" },
      { name: "Adobe Photoshop", value: "adobe-photoshop" },
      { name: "Adobe Illustrator", value: "adobe-illustrator" },
      { name: "After Effects", value: "after-effects" },
      { name: "Premiere Pro", value: "premiere-pro" },
      { name: "Cinema 4D", value: "cinema-4d" },
      { name: "Final Cut Pro", value: "final-cut-pro" },
      { name: "HitFilm Express", value: "hitfilm-express" },
      { name: "Maya", value: "maya" },
      { name: "Blender", value: "blender" },
      { name: "Houdini", value: "houdini" },
      { name: "Filmora", value: "filmora" },
    ],
  },
];

function FilterSidebar() {
  return (
    <div className="sticky top-24 w-full h-fit">
      <JobPostButtons />
      <Card className="border-muted/60 shadow-around overflow-hidden flex flex-col h-[calc(100vh-170px)] pb-1 gap-1">
        <CardHeader className=" border-b bg-muted/10 shrink-0">
          <CardTitle className="font-bold uppercase tracking-[0.15em] text-muted-foreground flex justify-between items-center">
            Filters
            <Button
              variant="ghost"
              className="h-fit p-2 text-xs uppercase text-muted-foreground hover:text-primary transition-colors flex gap-1"
            >
              <RotateCcw className="size-3" /> Clear
            </Button>
          </CardTitle>
        </CardHeader>

        <ScrollArea className="flex-1 w-full overflow-hidden">
          <CardContent className="p-0">
            <Accordion
              type="multiple"
              defaultValue={["Payout", "Location"]}
              className="w-full"
            >
              {filterOptions.map((filter) => (
                <AccordionItem
                  key={filter.category}
                  value={filter.category}
                  className="border-b px-5 border-muted/50 last:border-0"
                >
                  <AccordionTrigger className="hover:no-underline py-4 text-sm font-bold text-foreground/80">
                    {filter.category}
                  </AccordionTrigger>
                  <AccordionContent className="pb-5">
                    <div className="flex flex-col gap-3.5">
                      {filter.options.map((option) => {
                        const id = `${filter.category}-${option.value}`;
                        return (
                          <div
                            key={option.value}
                            className="flex items-center space-x-3 group cursor-pointer"
                          >
                            <Checkbox
                              id={id}
                              className="size-4.5 rounded-md border-muted-foreground/30 data-[state=checked]:bg-primary data-[state=checked]:border-primary transition-all"
                            />
                            <Label
                              htmlFor={id}
                              className="text-[13px] font-medium leading-none cursor-pointer text-muted-foreground group-hover:text-foreground transition-colors peer-disabled:opacity-70"
                            >
                              {option.name}
                            </Label>
                          </div>
                        );
                      })}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </ScrollArea>
      </Card>
    </div>
  );
}

export default FilterSidebar;
