import { db } from "@/lib/db";
import { TestimonialSchema } from "@/schemas";

export async function POST(req) {
  try {
    const body = await req.json();
    const data = TestimonialSchema.parse(body);

    const testimonial = await db.testimonials.create({
      data: {
        name: data.name,
        role: data.role,
        image: data.image,
        quote: data.quote,
        isArchived: data.isArchived ?? false,
      },
    });

    return Response.json({ success: true, data: testimonial }, { status: 201 });
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 400 });
  }
}

export async function GET() {
  try {
    const testimonials = await db.testimonials.findMany({
      orderBy: { createdAt: "desc" },
    });

    return Response.json(testimonials);
  } catch (error) {
    console.log(error);
    return Response.json({ error: error.message }, { status: 500 });
  }
}
