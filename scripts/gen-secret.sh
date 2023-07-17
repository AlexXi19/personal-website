#!/bin/bash

# Secret and namespace
SECRET_NAME="my-secret"
NAMESPACE="default"

# Start the YAML file
cat <<EOF > ${SECRET_NAME}.yaml
apiVersion: v1
kind: Secret
metadata:
  name: ${SECRET_NAME}
  namespace: ${NAMESPACE}
type: Opaque
data:
EOF

# Read the .env file line by line
while IFS='=' read -r key value
do
  # Base64 encode the value
  ENCODED_VALUE=$(echo -n "${value}" | base64)
  
  # Append the encoded secret to the YAML
  echo "  ${key}: ${ENCODED_VALUE}" >> ${SECRET_NAME}.yaml

done < .env

echo "Generated ${SECRET_NAME}.yaml"

