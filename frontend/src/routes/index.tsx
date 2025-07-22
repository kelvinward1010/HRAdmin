import { createBrowserRouter } from "react-router-dom";
import {
    homeUrl,
    layoutUrl,
} from "./urls";
import { ErrorBoundaryPage } from "@/components/error/boundary-error";
import { Home, Layout } from "@/modules";

export const routerConfig = createBrowserRouter([
    {
        path: layoutUrl,
        element: <Layout />,
        errorElement: (
            <Layout>
                <ErrorBoundaryPage />
            </Layout>
        ),
        children: [
            {
                path: homeUrl,
                element: <Home />,
            },
        ],
    },
]);