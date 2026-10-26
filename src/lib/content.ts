import { prisma } from "./prisma";

export async function getPlans() {
  return prisma.plan.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getTestimonials() {
  return prisma.testimonial.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getFaqs() {
  return prisma.faq.findMany({ orderBy: { sortOrder: "asc" } });
}

export async function getPosts() {
  return prisma.post.findMany({ orderBy: { publishedAt: "desc" } });
}

export async function getPost(slug: string) {
  return prisma.post.findUnique({ where: { slug } });
}

export async function getUpdates() {
  return prisma.updateNote.findMany({ orderBy: { publishedAt: "desc" } });
}
