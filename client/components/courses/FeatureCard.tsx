import Link from 'next/link';

type FeatureValue = string | 'checkmark' | '-';

interface FeatureCardProps {
  title: string;
  headers: string[];
  features: FeatureValue[];
  enrollHref: string;
  isBestCourse?: boolean;
}

function formatValue(value: FeatureValue | undefined) {
  if (value === 'checkmark') {
    return (
      <span className="text-lg font-black leading-none text-[#16a34a]" aria-label="Included">
        ✔
      </span>
    );
  }

  if (value === '-' || value === undefined || value === '') {
    return <span className="text-gray-400">-</span>;
  }

  return <span className="font-semibold text-[#0A3D24]">{value}</span>;
}

export function FeatureCard({ title, headers, features, enrollHref, isBestCourse = false }: FeatureCardProps) {
  return (
    <article
      className={`flex h-full flex-col rounded-xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md sm:p-6 ${isBestCourse ? 'border-[#13523f] ring-2 ring-[#13523f]/40' : 'border-gray-200'
        }`}
    >
      <div className="mb-4 flex items-start justify-between gap-3 border-b border-gray-100 pb-3">
        <h3 className="text-lg font-extrabold leading-tight text-gray-900">{title}</h3>
        {isBestCourse && (
          <span className="shrink-0 rounded-full bg-[#13523f] px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider text-white">
            Best
          </span>
        )}
      </div>

      <dl className="flex-1 space-y-3">
        {headers.map((header, index) => (
          <div
            key={`${title}-${header}-${index}`}
            className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-3 border-b border-gray-100 pb-2 last:border-b-0"
          >
            <dt className="text-sm font-medium leading-snug text-gray-700">{header}</dt>
            <dd className="text-sm font-bold text-right">{formatValue(features[index])}</dd>
          </div>
        ))}
      </dl>

      <Link
        href={enrollHref}
        className="mt-6 inline-flex w-full items-center justify-center rounded-md bg-[#0A3D24] px-4 py-2.5 text-sm font-extrabold uppercase tracking-wide text-white transition-colors hover:bg-black"
      >
        Apply Now
      </Link>
    </article>
  );
}

interface CourseFeaturesCardsProps {
  headers: string[];
  columns: Array<{
    title: string;
    features: FeatureValue[];
  }>;
  enrollHref: string;
  bestColumnIndex?: number;
}

export default function CourseFeaturesCards({
  headers,
  columns,
  enrollHref,
  bestColumnIndex
}: CourseFeaturesCardsProps) {
  if (!columns?.length || !headers?.length) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:gap-5 lg:grid-cols-2 xl:grid-cols-3">
      {columns.map((column, columnIndex) => (
        <FeatureCard
          key={`${column.title}-${columnIndex}`}
          title={column.title}
          headers={headers}
          features={column.features}
          enrollHref={enrollHref}
          isBestCourse={bestColumnIndex === columnIndex}
        />
      ))}
    </div>
  );
}