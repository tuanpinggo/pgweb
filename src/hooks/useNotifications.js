import axiosClient from "@/api-client/axiosClient";
import { useRouter } from "next/router";
import { useState } from "react";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

export function useNotifications() {
  const { data: overview, mutate: mutateOverview } = useSWR(
    `/notifications/overview`,
    {
      dedupingInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
    }
  );

  const [topicInDrawer, setTopicInDrawer] = useState(null);

  const router = useRouter();

  const {
    data: notificationsInDrawer,
    mutate: mutateNotificationsInDrawer,
    isLoading: isNotiInDrawerLoading,
    isValidating: isNotiInDrawerValidating,
  } = useSWR(
    ["/notifications/drawer", topicInDrawer],
    () => {
      return axiosClient.get("/notifications", {
        params: {
          topic: topicInDrawer,
          limit: 4,
        },
      });
    },
    {
      dedupingInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
    }
  );

  const {
    data: notifications,
    mutate,
    isLoading,
    isValidating,
  } = useSWR(
    ["/notifications", router.query?.topic, router.query?.page],
    () => {
      return axiosClient.get("/notifications", {
        params: {
          ...(!!router.query?.topic
            ? {
                topic: Number(router.query?.topic),
              }
            : {}),

          limit: 10,
          page: Number(router.query?.page || 1),
        },
      });
    },
    {
      dedupingInterval: 1000,
      revalidateOnFocus: false,
      shouldRetryOnError: false,
      revalidateIfStale: false,
      keepPreviousData: true,
    }
  );

  const { trigger: readAllNotifications, isMutating: isReadAllMutating } =
    useSWRMutation("/notifications/read-all", (url, { arg: { topicId } }) => {
      return axiosClient.post(url, {
        ...(!!topicId ? { topic: topicId } : {}),
      });
    });
  const { trigger: readNotification, isMutating: isReadNotificationMutating } =
    useSWRMutation(
      "/notifications/read",
      (_, { arg: { notificationId, topicId } }) => {
        return axiosClient.post(`/notifications/${notificationId}/read`, {
          ...(!!topicId ? { topic: topicId } : {}),
        });
      }
    );

  return {
    overview: overview?.data,
    mutateOverview,
    notificationsInDrawer: notificationsInDrawer?.data,
    mutateNotificationsInDrawer,

    readAllNotifications,
    isReadAllMutating,
    isNotiInDrawerLoading: isNotiInDrawerLoading || isNotiInDrawerValidating,
    readNotification,
    isReadNotificationMutating,
    notifications: notifications,
    isLoading: isLoading || isValidating,
    mutate,
    topicInDrawer,
    setTopicInDrawer,
  };
}
