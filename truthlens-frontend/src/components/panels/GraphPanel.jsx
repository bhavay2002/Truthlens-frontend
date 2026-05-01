const MetricCard = ({ label, value }) => (
  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-center">
    <div className="text-xs text-gray-500 mb-1">{label}</div>
    <div className="text-2xl font-bold text-gray-800">{typeof value === 'number' ? value.toFixed(value % 1 === 0 ? 0 : 3) : value ?? 'N/A'}</div>
  </div>
);

export default function GraphPanel({ graphAnalysis }) {
  if (!graphAnalysis) return <div className="text-gray-400 text-sm">No graph analysis data available.</div>;

  const { narrative_graph_metrics = {}, graph_features = {}, temporal_graph = {} } = graphAnalysis;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-semibold text-gray-700 mb-3">Narrative Graph Metrics</h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <MetricCard label="Nodes" value={narrative_graph_metrics.graph_nodes} />
          <MetricCard label="Edges" value={narrative_graph_metrics.graph_edges} />
          <MetricCard label="Density" value={narrative_graph_metrics.graph_density} />
          <MetricCard label="Clustering" value={narrative_graph_metrics.graph_clustering} />
        </div>
      </div>

      {Object.keys(graph_features).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Graph Features</h3>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(graph_features).map(([key, val]) => (
              <MetricCard
                key={key}
                label={key.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                value={val}
              />
            ))}
          </div>
        </div>
      )}

      {Object.keys(temporal_graph).length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-gray-700 mb-3">Temporal Graph</h3>
          <div className="grid grid-cols-2 gap-3">
            <MetricCard label="Topic Shift Score" value={temporal_graph.topic_shift_score} />
            <MetricCard label="Narrative Drift" value={temporal_graph.narrative_drift} />
          </div>
        </div>
      )}
    </div>
  );
}
