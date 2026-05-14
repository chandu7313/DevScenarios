import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import connectDB from '@/lib/db';
import ScenarioModel from '@/models/Scenario';
import { Scenario } from '@/types';
import { ScenarioPageClient } from '@/components/scenario/ScenarioPageClient';

interface PageProps {
  params: { slug: string };
}

async function getScenario(slug: string): Promise<Scenario | null> {
  await connectDB();
  const doc = await ScenarioModel.findOne({ slug }).lean();
  if (!doc) return null;
  return JSON.parse(JSON.stringify(doc)) as Scenario;
}

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  try {
    await connectDB();
    const scenarios = await ScenarioModel.find({}, { slug: 1 }).lean();
    return scenarios.map((s) => ({ slug: s.slug }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const scenario = await getScenario(params.slug);
  if (!scenario) {
    return { title: 'Scenario Not Found | DevScenarios' };
  }
  return {
    title: `${scenario.title} | DevScenarios`,
    description: scenario.shortDescription,
  };
}

export const dynamic = 'force-dynamic';

export default async function ScenarioPage({ params }: PageProps) {
  const scenario = await getScenario(params.slug);

  if (!scenario) {
    notFound();
  }

  return <ScenarioPageClient scenario={scenario} />;
}
