export const animation = (
    duriation: number,
    from: any,
    to: any,
    onProgress: (current: any) => void
) => {

    let current = from;
    const speed = (to - from) / duriation;
    const start = Date.now();
    // 注册状态

    const _run = () => {
        const now = Date.now();
        const time = now - start
        // 更改状态
        if (time >= duriation) {
            current = to;            
            onProgress(current);
            return
        }
        onProgress(current)
        current = from + speed * time;
        requestAnimationFrame(_run);
    }

    _run();


}