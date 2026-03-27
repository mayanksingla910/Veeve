import { MapPin } from "lucide-react";

const options = [
  {
    name: "employmentType",
    value: "Full-time",
    variant: "default",
  },
  {
    name: "workArrangement",
    value: "onsite",
    variant: "default",
  },
  {
    name: "location",
    icon: <MapPin data-icon="inline-start" />,
    value: "India, Delhi",
    variant: "default",
  },
];

function HeaderDetailBadges() {
  return (
    <div className="flex gap-2 ">
      <Badge>Full Time</Badge>
      <Badge variant="outline">Onsite</Badge>
      <Badge variant="secondary">
        <MapPin data-icon="inline-start" /> India, Delhi
      </Badge>
    </div>
  );
}

function Badge({ name, value, icon, variant }: any) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <p className="text-xs text-muted-foreground">{value}</p>
    </div>
  );
}

export default HeaderDetailBadges;
