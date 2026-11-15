import { NextResponse } from "next/server";
import { requireApiAuth } from "@/lib/security/api-auth";

const json = (description: string) => ({
  description,
  content: { "application/json": { schema: { type: "object" } } },
});

const unauthorized = { description: "Authentication required." };

export async function GET() {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;

  const document = {
    openapi: "3.1.0",
    info: {
      title: "Macniss CMS API",
      version: "1.0.0",
      description:
        "HTTP contract for the Macniss website and CMS. Public reads and enquiry submission require no session; CMS mutations require an active Auth.js cookie session.",
    },
    servers: [{ url: "/", description: "Current deployment" }],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "authjs.session-token",
          description:
            "Auth.js session cookie. Secure deployments may prefix the cookie name with __Secure-.",
        },
      },
      schemas: {
        Error: {
          type: "object",
          properties: { error: { type: "string" } },
        },
      },
    },
    paths: {
      "/api/auth/session": {
        get: { summary: "Read the current Auth.js session", responses: { "200": json("Session object or null.") } },
      },
      "/api/auth/login": {
        post: {
          summary: "Sign in with email and password",
          description: "Validates credentials, creates the Auth.js session cookie, and returns a safe local redirect path.",
          requestBody: {
            required: true,
            content: {
              "application/json": {
                schema: {
                  type: "object",
                  required: ["values"],
                  properties: {
                    values: {
                      type: "object",
                      required: ["email", "password"],
                      properties: {
                        email: { type: "string", format: "email" },
                        password: { type: "string", format: "password", writeOnly: true },
                      },
                    },
                    callbackUrl: { type: "string", example: "/dashboard" },
                  },
                },
              },
            },
          },
          responses: {
            "200": json("Login succeeded and a local redirect path was returned."),
            "400": json("Invalid request."),
            "401": json("Invalid email or password."),
            "500": json("Authentication failed."),
          },
        },
      },
      "/api/setup": {
        get: { summary: "Check whether first-run setup is required", responses: { "200": json("Setup state.") } },
        post: { summary: "Create the first CMS account", responses: { "201": json("Initial account created."), "409": json("Setup already completed.") } },
      },
      "/api/projects": {
        get: { summary: "List developments", responses: { "200": json("Development list.") } },
        post: { summary: "Create a development", security: [{ cookieAuth: [] }], requestBody: { required: true, content: { "multipart/form-data": { schema: { type: "object" } } } }, responses: { "201": json("Development created."), "401": unauthorized } },
      },
      "/api/projects/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        put: { summary: "Update a development", security: [{ cookieAuth: [] }], responses: { "200": json("Development updated."), "401": unauthorized } },
        delete: { summary: "Permanently delete a development", security: [{ cookieAuth: [] }], responses: { "200": json("Development deleted."), "401": unauthorized } },
      },
      "/api/projects/{id}/archive": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { summary: "Archive or restore a development", security: [{ cookieAuth: [] }], responses: { "200": json("Archive state updated."), "401": unauthorized } },
      },
      "/api/solutions": {
        get: { summary: "List capabilities", responses: { "200": json("Capability list.") } },
        post: { summary: "Create a capability", security: [{ cookieAuth: [] }], responses: { "201": json("Capability created."), "401": unauthorized } },
      },
      "/api/solutions/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { summary: "Update or archive a capability", security: [{ cookieAuth: [] }], responses: { "200": json("Capability updated."), "401": unauthorized } },
        delete: { summary: "Permanently delete a capability", security: [{ cookieAuth: [] }], responses: { "200": json("Capability deleted."), "401": unauthorized } },
      },
      "/api/testimonials": {
        get: { summary: "List testimonials", responses: { "200": json("Testimonial list.") } },
        post: { summary: "Create a testimonial", security: [{ cookieAuth: [] }], responses: { "201": json("Testimonial created."), "401": unauthorized } },
      },
      "/api/testimonials/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { summary: "Update a testimonial", security: [{ cookieAuth: [] }], responses: { "200": json("Testimonial updated."), "401": unauthorized } },
        delete: { summary: "Archive a testimonial", security: [{ cookieAuth: [] }], responses: { "200": json("Testimonial archived."), "401": unauthorized } },
      },
      "/api/consultations": {
        get: { summary: "List enquiries", security: [{ cookieAuth: [] }], parameters: [{ name: "status", in: "query", schema: { type: "string", enum: ["PENDING", "CONTACTED"] } }], responses: { "200": json("Enquiry list."), "401": unauthorized } },
        post: { summary: "Submit a public consultation request", responses: { "201": json("Enquiry created."), "400": json("Invalid enquiry.") } },
      },
      "/api/consultations/{id}": {
        parameters: [{ name: "id", in: "path", required: true, schema: { type: "string" } }],
        patch: { summary: "Set an enquiry status", security: [{ cookieAuth: [] }], responses: { "200": json("Status updated."), "401": unauthorized } },
      },
      "/api/interior-gallery": {
        get: { summary: "Read the interior gallery", responses: { "200": json("Gallery data.") } },
        patch: { summary: "Upload interior images", security: [{ cookieAuth: [] }], responses: { "200": json("Gallery updated."), "401": unauthorized } },
      },
      "/api/interior-gallery/{fileId}": {
        parameters: [{ name: "fileId", in: "path", required: true, schema: { type: "string" } }],
        delete: { summary: "Delete an interior image", security: [{ cookieAuth: [] }], responses: { "200": json("Image deleted."), "401": unauthorized } },
      },
      "/api/imagekit-auth": {
        get: { summary: "Get protected ImageKit upload authentication", security: [{ cookieAuth: [] }], responses: { "200": json("Upload authentication parameters."), "401": unauthorized } },
      },
      "/api/openapi": {
        get: { summary: "Download this OpenAPI document", security: [{ cookieAuth: [] }], responses: { "200": json("OpenAPI 3.1 document."), "401": unauthorized } },
      },
    },
  };

  return NextResponse.json(document, {
    headers: { "Cache-Control": "private, no-store" },
  });
}
