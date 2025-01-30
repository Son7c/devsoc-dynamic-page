import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "0mdt7i04",
  dataset: "production",
  useCdn: true,
  apiVersion: "2025-01-30",
});

export default client;