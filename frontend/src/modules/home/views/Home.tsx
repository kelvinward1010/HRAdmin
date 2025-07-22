import { Typography } from "antd";
import styles from "./Home.module.scss";
import { useTranslation } from "react-i18next";

const { Title } = Typography;

export function Home() {
    const { t } = useTranslation();

    return (
        <div className={styles.container}>
            <Title level={3}>Home {t("name_app")}</Title>
        </div>
    );
}