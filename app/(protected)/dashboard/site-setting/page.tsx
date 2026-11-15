import { requireSession } from "@/lib/auth-secure/authorization";
import { requireTrustedMutationOrigin } from "@/lib/security/mutation-origin";
import fs from "fs";
import path from "path";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// export const metadata = {
//   title: 'SEO Settings',
//   description: 'Update website logo, description, and keywords.',
// };

type SeoData = { logo: string; description: string; keywords: string[] };

export default async function SiteSetting() {
  // Read the existing data from the file
  const filePath = path.join(process.cwd(), "public", "data.js");
  let seoData: SeoData = { logo: "", description: "", keywords: [] };

  if (fs.existsSync(filePath)) {
    const fileContent = fs.readFileSync(filePath, "utf-8");
    seoData = JSON.parse(fileContent);
  }

  // Server action for handling form submission
  async function handleUpdate(formData: FormData) {
    "use server"; // Enables server actions
    await requireTrustedMutationOrigin();
    await requireSession();

    const description = String(formData.get("description") ?? "");
    const keywords = String(formData.get("keywords") ?? "")
      .split(",")
      .map((kw) => kw.trim())
      .filter(Boolean);
    const updatedData: SeoData = { logo: seoData.logo, description, keywords };

    // Handle logo upload
    const logoFile = formData.get("logo");
    if (logoFile instanceof File && logoFile.size > 0) {
      const logoPath = path.join(process.cwd(), "public", "logo.png");
      const buffer = new Uint8Array(await logoFile.arrayBuffer());
      fs.writeFileSync(logoPath, buffer);
      updatedData.logo = "/logo.png"; // Save the path to the data
    } else {
      updatedData.logo = seoData.logo; // Retain existing logo if no new file is uploaded
    }

    // Write updated data to `data.js`
    const fileContent = JSON.stringify(updatedData, null, 2);
    try {
      fs.writeFileSync(filePath, fileContent, "utf-8");
    } catch (error) {
      console.error("Error updating SEO settings:", error);
    }
  }

  return (
    <Card className="rounded-none border-border bg-card text-card-foreground shadow-none">
      <CardHeader className="border-b border-border">
        <CardTitle>Update SEO Settings</CardTitle>
      </CardHeader>
      <CardContent className="pt-6">
      <form action={handleUpdate} className="max-w-3xl space-y-6">
        <div>
          <label htmlFor="logo" className="block font-medium mb-1">
            Upload Website Logo (PNG only)
          </label>
          <Input
            id="logo"
            name="logo"
            type="file"
            accept="image/png"
          />
          {seoData.logo && (
            <div className="mt-2">
              <p className="text-sm text-gray-500">Current Logo:</p>
              <img
                src={seoData.logo}
                alt="Current Logo"
                className="h-16 w-16 object-contain border rounded"
              />
            </div>
          )}
        </div>
        <div>
          <label htmlFor="description" className="block font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            name="description"
            defaultValue={seoData.description}
            rows={3}
          />
        </div>
        <div>
          <label htmlFor="keywords" className="block font-medium mb-1">
            Keywords (comma-separated)
          </label>
          <Input
            id="keywords"
            name="keywords"
            type="text"
            defaultValue={seoData.keywords.join(", ")}
          />
        </div>
        <Button
            type="submit"
            className="rounded-none bg-primary px-5 text-primary-foreground hover:bg-primary/85"
          >
            Save Changes
          </Button>
      </form>
      </CardContent>
    </Card>
  );
}
