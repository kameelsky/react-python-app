export function downloadBlob(blob: Blob, filename: string): void {
    const url = window.URL.createObjectURL(blob);
    const aLink = document.createElement("a");
    aLink.href = url;
    aLink.download = filename;
    document.body.appendChild(aLink);
    aLink.click();
    aLink.remove();
    window.URL.revokeObjectURL(url);
}
