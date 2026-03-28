import React from "react";

/**
 * Props
 *  rows        : array of { name, unit, water, milk, rda }
 *  servingLabel: string shown above the table
 */
export default function NutritionTable({ rows = [], servingLabel }) {
  if (!rows.length) return null;

  return (
    <div className="overflow-x-auto">
      {servingLabel && (
        <p className="text-dark-500 text-sm text-center mb-4">
          Serving Size: <strong>{servingLabel}</strong>
        </p>
      )}

      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="bg-dark-900 text-white">
            {["Nutrients", "Units", "Per Serving\n(Water)", "Per Serving\n(Milk)", "%RDA"].map(
              (h) => (
                <th
                  key={h}
                  className="px-4 py-3 font-semibold text-left first:text-left text-center whitespace-pre-line text-xs tracking-wide"
                >
                  {h}
                </th>
              )
            )}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.name}
              className={i % 2 === 0 ? "bg-gray-50" : "bg-white"}
            >
              <td className="px-4 py-2.5 font-medium text-dark-800">{row.name}</td>
              <td className="px-4 py-2.5 text-center text-dark-500">{row.unit}</td>
              <td className="px-4 py-2.5 text-center font-semibold text-dark-800">{row.water}</td>
              <td className="px-4 py-2.5 text-center font-semibold text-dark-800">{row.milk}</td>
              <td className="px-4 py-2.5 text-center font-semibold text-brand-600">{row.rda}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-[11px] text-dark-400 mt-3 leading-relaxed">
        RDA – Recommended Daily Allowance (as per ICMR). **Daily Value Not Established.
        *Naturally Derived Minerals Amino Acid Profile. +Indicates Branched Chain Amino Acids (BCAA).
        EAA – Essential Amino Acids. NAA – Non-Essential Amino Acids.
      </p>
    </div>
  );
}
