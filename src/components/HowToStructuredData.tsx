interface HowToStructuredDataProps {
  name: string;
  description: string;
  steps: string[];
  totalTime?: string; // ISO 8601 duration e.g. PT10M
  supplies?: string[];
  tools?: string[];
}

export default function HowToStructuredData({
  name,
  description,
  steps,
  totalTime,
  supplies = [],
  tools = [],
}: HowToStructuredDataProps) {
  if (!name || !steps?.length) return null;

  const data: any = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name,
    description,
    step: steps.map((text, index) => ({
      "@type": "HowToStep",
      position: index + 1,
      name: text.replace(/\.$/, ""),
      text,
    })),
  };

  if (totalTime) {
    data.totalTime = totalTime;
  }
  if (supplies.length) {
    data.supply = supplies.map((item) => ({ "@type": "HowToSupply", name: item }));
  }
  if (tools.length) {
    data.tool = tools.map((item) => ({ "@type": "HowToTool", name: item }));
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

