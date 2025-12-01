import { TabelkaSettingsPanel } from "./TabelkaSettingsPanel";
import { TabelkaPreview } from "./TabelkaPreview";
import { TabelkaOutput } from "./TabelkaOutput";
import { useTabelka } from "@/hooks/useTabelka";

export default function Tabelka() {
  const {
    state,
    output,
    logoOutput,
    setPreset,
    setResolution,
    setSide,
    setBlueprint,
    setContent,
    setContentFontSize,
    saveContent,
    generate,
    previewContent,
  } = useTabelka();

  return (
    <div className="flex h-full flex-1 gap-4 overflow-hidden p-4">
      {/* Left Panel - Settings */}
      <TabelkaSettingsPanel
        state={state}
        onPresetChange={setPreset}
        onResolutionChange={setResolution}
        onSideChange={setSide}
        onBlueprintChange={setBlueprint}
        onContentChange={setContent}
        onContentFontSizeChange={setContentFontSize}
        onSaveContent={saveContent}
        onGenerate={generate}
      />

      {/* Right Panel - Preview & Output */}
      <div className="flex flex-1 flex-col gap-4 overflow-hidden">
        {/* Preview */}
        <TabelkaPreview
          width={state.width}
          height={state.height}
          side={state.side}
          content={previewContent}
        />

        {/* Output */}
        <TabelkaOutput output={output} logoOutput={logoOutput} />
      </div>
    </div>
  );
}
