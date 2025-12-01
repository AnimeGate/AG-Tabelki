import { ASSTableSettingsPanel } from "./ASSTableSettingsPanel";
import { ASSTablePreview } from "./ASSTablePreview";
import { ASSTableOutput } from "./ASSTableOutput";
import { useASSTable } from "@/hooks/useASSTable";

export default function ASSTable() {
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
  } = useASSTable();

  return (
    <div className="flex h-full flex-1 gap-4 overflow-hidden p-4">
      {/* Left Panel - Settings */}
      <ASSTableSettingsPanel
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
        <ASSTablePreview
          width={state.width}
          height={state.height}
          side={state.side}
          content={previewContent}
        />

        {/* Output */}
        <ASSTableOutput output={output} logoOutput={logoOutput} />
      </div>
    </div>
  );
}
