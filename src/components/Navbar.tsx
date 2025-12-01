import { Link } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import SettingsModal from "./SettingsModal";
import { ChangelogHistoryDialog } from "./ChangelogHistoryDialog";

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <nav className="border-b bg-card/50 backdrop-blur-sm">
      <div className="flex items-center justify-between px-4 py-2">
        {/* Left: Brand */}
        <Link to="/" className="flex items-center gap-2">
          <span className="text-xl font-bold text-primary">{t("appName")}</span>
        </Link>

        {/* Right: Changelog & Settings */}
        <div className="flex items-center gap-1">
          <ChangelogHistoryDialog />
          <SettingsModal />
        </div>
      </div>
    </nav>
  );
}
