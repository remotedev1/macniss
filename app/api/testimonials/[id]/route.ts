import { requireApiAuth } from "@/lib/security/api-auth";
import { db } from "@/lib/db";
import { TestimonialSchema } from "@/schemas";

export async function PATCH(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;
  try {
    const body = await req.json();
    const data = TestimonialSchema.partial().parse(body); // allow partial updates

    const updated = await db.testimonials.update({
      where: { id: params.id },
      data,
    });

    return Response.json(updated);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function DELETE(req, { params }) {
  const { response: authResponse } = await requireApiAuth();
  if (authResponse) return authResponse;
  try {
    const archived = await db.testimonials.update({
      where: { id: params.id },
      data: { isArchived: true },
    });

    return Response.json(archived);
  } catch (error) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
