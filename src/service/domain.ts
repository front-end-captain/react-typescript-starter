let domain: string;

if (process.env.NODE_ENV === "development") {
  domain = "http://10.26.13.50:3000";
} else {
  domain = "http://online.api";
}

export { domain };
