import { Copy, FileText, FolderPlus } from "lucide-react";
import { Button, Modal, Space, Tag } from "antd";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { formatPromptDate, type Prompt } from "@/services/api/prompts";

export function PromptDetailDialog({ prompt, onClose, onCopy, onSaveAsset }: { prompt: Prompt | null; onClose: () => void; onCopy: (prompt: string) => void; onSaveAsset?: (prompt: Prompt) => void }) {
    const { i18n, t } = useTranslation();
    const navigate = useNavigate();

    return (
        <Modal title={prompt?.title} open={Boolean(prompt)} onCancel={onClose} footer={null} width={960} centered styles={{ body: { height: "calc(85vh - 55px)", overflow: "hidden" } }}>
            {prompt ? (
                <div className="flex h-full min-h-0 flex-col overflow-y-auto md:grid md:grid-cols-[minmax(260px,0.95fr)_minmax(360px,1.05fr)] md:grid-rows-[minmax(0,1fr)] md:gap-5 md:overflow-visible">
                    <div className="shrink-0 space-y-3 pb-4 md:flex md:h-full md:min-h-0 md:min-w-0 md:flex-col md:gap-3 md:space-y-0 md:overflow-y-auto md:pb-0 md:pr-1">
                        {prompt.coverUrl ? <img src={prompt.coverUrl} alt={prompt.title} className="h-48 w-full rounded-lg object-cover sm:h-56 md:h-auto md:max-h-[min(68vh,720px)] md:object-contain md:bg-stone-100" /> : <div className="grid h-48 w-full place-items-center rounded-lg bg-stone-100 text-stone-400 dark:bg-stone-900 dark:text-stone-600 sm:h-56"><FileText className="size-9" /></div>}
                        {prompt.referenceImageUrls.length > 1 ? <div className="grid grid-cols-6 gap-2">{prompt.referenceImageUrls.filter((url) => url !== prompt.coverUrl).slice(0, 6).map((url) => <img key={url} src={url} alt="" className="aspect-square w-full rounded-md object-cover" loading="lazy" />)}</div> : null}
                    </div>
                    <div className="min-h-0 min-w-0 md:flex md:h-full md:flex-col md:overflow-hidden">
                        <div className="min-h-0 border-y border-stone-200 py-4 pr-2 dark:border-stone-800 md:flex-1 md:overflow-y-auto md:overscroll-contain">
                            <div className="flex flex-wrap gap-1.5">
                                {prompt.tags.map((tag) => (
                                    <Tag key={tag} className="m-0">
                                        {tag}
                                    </Tag>
                                ))}
                            </div>
                            {prompt.description ? <p className="mt-4 text-sm leading-6 text-stone-500 dark:text-stone-400">{prompt.description}</p> : null}
                            {prompt.preview ? <pre className="mt-4 whitespace-pre-wrap rounded-lg bg-stone-100 p-3 text-xs leading-5 text-stone-600 dark:bg-stone-900 dark:text-stone-300">{prompt.preview}</pre> : null}
                            <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-stone-800 dark:text-stone-300">{prompt.prompt}</p>
                            {prompt.createdAt || prompt.updatedAt ? <div className="mt-4 text-xs text-stone-500 dark:text-stone-400">{prompt.createdAt ? t("common.created", { date: formatPromptDate(prompt.createdAt, i18n.resolvedLanguage) }) : null}{prompt.createdAt && prompt.updatedAt ? " · " : null}{prompt.updatedAt ? t("common.updated", { date: formatPromptDate(prompt.updatedAt, i18n.resolvedLanguage) }) : null}</div> : null}
                        </div>
                        <div className="shrink-0 pt-4">
                            <Space wrap>
                                <Button type="primary" autoInsertSpace={false} onClick={() => navigate("/image?prompt=" + encodeURIComponent(prompt.prompt))}>
                                    {t("common.use")}
                                </Button>
                                <Button type="primary" icon={<Copy className="size-4" />} onClick={() => onCopy(prompt.prompt)}>
                                    {t("common.copyPrompt")}
                                </Button>
                                {onSaveAsset ? (
                                    <Button icon={<FolderPlus className="size-4" />} onClick={() => onSaveAsset(prompt)}>
                                        {t("common.addToAssets")}
                                    </Button>
                                ) : null}
                            </Space>
                        </div>
                    </div>
                </div>
            ) : null}
        </Modal>
    );
}
