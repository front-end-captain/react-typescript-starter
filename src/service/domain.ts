let domain: string;

if (process.env.NODE_ENV === "development") {
  domain = "http://localhost:3000";
} else {
  domain = "http://online.api";
}

export { domain };
