export const VISITOR_TABLE_HEADER = [
  {
    header: "Country",
    field: "country",
    render: (row) => (
      <div className="flex items-center gap-2">
        <img src={row.icon} className="h-4" />
        {row.country}
      </div>
    ),
  },
  { header: "Region", field: "region" },
  { header: "Device", field: "device" },
  { header: "Visited", field: "visited" },
  { header: "Count", field: "visitCount" },
];
