# Must grant permission first to run:
# chmod +x ./pull-types.sh

npx openapi-typescript "https://tbsnhkewuwyfxowgazvr.supabase.co/rest/v1/?apikey=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRic25oa2V3dXd5Znhvd2dhenZyIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjA4ODk1MDIsImV4cCI6MTk3NjQ2NTUwMn0.DrYXawTbwMI4dtKOj7zpQBJmQSNH01aGFd2CpeNhoCs" --yes --output src/lib/types/supabase.ts
