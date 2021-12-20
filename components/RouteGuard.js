import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { userService } from "services";

const RouteGuard = ({ children }) => {
  const router = useRouter();
  const [authorised, setAuthorised] = useState(false);
  const authCheck = (url) => {
    const publibPaths = ["/login"];
    const path = url.split("?")[0];
    if (!userService.userValue && !publicPaths.include(path)) {
      setAuthorised(false);
      router.push({
        pathname: "/login",
        query: {
          returnUrl: router.asPath,
        },
      });
    } else {
      setAuthorised(true);
    }
  };
  useEffect(() => {
    authCheck(router.asPath);
    const hideContent = () => {
      setAuthorised(false);
    };
    router.events.on("routeChangeStart", hideContent);
    router.events.on("routeChangeComplete", authCheck);
    return () => {
      router.events.off("routeChangeStart", hideContent);
      router.events.off("routeChangeComplete", authCheck);
    };
  });
  return authorised && children;
};

export { RouteGuard };
