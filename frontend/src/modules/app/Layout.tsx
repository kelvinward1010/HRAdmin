import {
    DefaultFooter,
    PageContainer,
    ProLayout,
    type MenuDataItem,
    type ProLayoutProps,
} from "@ant-design/pro-layout";
import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { defaultMenus } from "./menus";
import styles from "./Layout.module.scss";
import "./index.css";
import {
    LogoutOutlined
} from "@ant-design/icons";
import { Dropdown, Input } from "antd";
import { Logo } from "@/assets/images";
import { useTranslation } from "react-i18next";

export type LayoutProps = {
    children?: React.ReactNode;
} & ProLayoutProps;

export const Layout: React.FC<LayoutProps> = (props) => {
    const { children } = props;
    const { t } = useTranslation();
    const navigate = useNavigate();

    const loopMenuItem = (menus: any[]): MenuDataItem[] =>
        menus.map(({ icon, routes, ...item }) => ({
            ...item,
            icon: icon,
            children: routes && loopMenuItem(routes),
        }));

    const defaultFooterDom = (
        <DefaultFooter
            copyright={`${new Date().getFullYear()} 蚂蚁集团体验技术部出品`}
            links={[]}
        />
    );

    const FormHeader = () => {
        return (
            <div className={styles.containerHeader}>
                <Input.Search className={styles.search} />
            </div>
        );
    };

    return (
        <ProLayout
            className={styles.containerLayout}
            logo={Logo}
            {...props}
            title={t("name_app")}
            layout={"mix"}
            menuItemRender={(menuItemProps, defaultDom) => {
                if (
                    !menuItemProps.path ||
                    location.pathname === menuItemProps.path
                ) {
                    return defaultDom;
                }
                return (
                    <a onClick={() => navigate(menuItemProps.path as string)}>
                        {defaultDom}
                    </a>
                );
            }}
            menu={{
                request: async () => loopMenuItem(defaultMenus),
            }}
            avatarProps={{
                src: "https://gw.alipayobjects.com/zos/antfincdn/efFD%24IOql2/weixintupian_20170331104822.jpg",
                size: "small",
                title: "HR Admin",
                render: (_, dom) => {
                    return (
                        <Dropdown
                            menu={{
                                items: [
                                    {
                                        key: "logout",
                                        icon: <LogoutOutlined />,
                                        label: "Sign out",
                                    },
                                ],
                            }}
                        >
                            {dom}
                        </Dropdown>
                    );
                },
            }}
            actionsRender={(props) => {
                if (props.isMobile) return [];
                if (typeof window === "undefined") return [];
                return [];
            }}
            breadcrumbRender={(routers = []) => [
                {
                    path: "/",
                },
                ...routers,
            ]}
            itemRender={(route, __, routes, paths) => {
                const first = routes.indexOf(route) === 0;
                return first ? (
                    <Link to={paths.join("/")}>{route.title}</Link>
                ) : (
                    <span>{route.title}</span>
                );
            }}
            headerContentRender={FormHeader}
            footerRender={() => defaultFooterDom}
        >
            <PageContainer>
                <Outlet />
                {children}
            </PageContainer>
        </ProLayout>
    );
};