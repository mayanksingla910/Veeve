import Feed from "@/components/feed/feed";
import {
  Tabs,
  TabsContent,
  TabsContents,
  TabsList,
  TabsTrigger,
} from "@/components/ui/shadcn-io/tabs";

function ProfileTabs() {
  return (
    <div className="min-h-screen">
      <Tabs defaultValue="featured" className="w-full">
        <div className="sticky top-30 md:top-33 z-50 w-full flex justify-center bg-background pb-4 pt-14">
          <TabsList>
            <TabsTrigger value="featured">Featured</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
          </TabsList>
        </div>

        <TabsContents className="w-full mt-2">
          <TabsContent value="featured">
            <Feed />
          </TabsContent>
          <TabsContent value="videos">
            <Feed />
          </TabsContent>
        </TabsContents>
      </Tabs>
    </div>
  );
}

export default ProfileTabs;
