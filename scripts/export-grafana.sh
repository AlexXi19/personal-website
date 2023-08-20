#!/bin/bash

GRAFANA_URL="https://dashboard.alexxi.dev"

SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

cd "$SCRIPT_DIR/../resources/infra/dashboards"

DASHBOARDS=$(curl -s -H "Authorization: Bearer ${API_KEY}" "${GRAFANA_URL}/api/search?folderIds=0" | jq -r '.[] .uid')

for DASHBOARD in $DASHBOARDS; do
  DASHBOARD_JSON=$(curl -s -H "Authorization: Bearer ${API_KEY}" "${GRAFANA_URL}/api/dashboards/uid/${DASHBOARD}")
  DASHBOARD_TITLE=$(echo $DASHBOARD_JSON | jq -r '.dashboard.title')
  echo "Exporting dashboard: ${DASHBOARD_TITLE}"
  
  echo $DASHBOARD_JSON | jq '.dashboard' > "${DASHBOARD_TITLE// /_}.json"
done

echo "Dashboards exported!"
