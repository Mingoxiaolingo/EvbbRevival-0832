import { useMutation, useQuery } from "@tanstack/react-query";
import { orpc } from "../lib/api";

export function useServerStatus() {
  return useQuery({ ...orpc.server.status.queryOptions(), refetchInterval: 60_000 });
}

export function useSubmitApplication() {
  return useMutation(orpc.applications.create.mutationOptions());
}
