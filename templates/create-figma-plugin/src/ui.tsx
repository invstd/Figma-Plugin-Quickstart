import { render, Button, Textbox, Text, Stack, Container } from '@create-figma-plugin/ui';
import { h } from 'preact';
import { useState, useEffect, useRef, useCallback } from 'preact/hooks';
import { on, emit } from '@create-figma-plugin/utilities';
import '!./output.css';

// Custom scrollbar hook
function useCustomScrollbar(contentRef: React.RefObject<HTMLDivElement>) {
  const [thumbHeight, setThumbHeight] = useState(0);
  const [thumbTop, setThumbTop] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [showScrollbar, setShowScrollbar] = useState(false);
  const dragStartRef = useRef<{ y: number; scrollTop: number } | null>(null);

  const updateScrollbar = useCallback(() => {
    const content = contentRef.current;
    if (!content) return;

    const { scrollHeight, clientHeight, scrollTop } = content;
    const hasScroll = scrollHeight > clientHeight;
    setShowScrollbar(hasScroll);

    if (hasScroll) {
      const ratio = clientHeight / scrollHeight;
      const newThumbHeight = Math.max(30, clientHeight * ratio);
      const maxScrollTop = scrollHeight - clientHeight;
      const scrollRatio = scrollTop / maxScrollTop;
      const maxThumbTop = clientHeight - newThumbHeight;
      
      setThumbHeight(newThumbHeight);
      setThumbTop(scrollRatio * maxThumbTop);
    }
  }, [contentRef]);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return;

    const handleScroll = () => updateScrollbar();
    content.addEventListener('scroll', handleScroll);
    
    updateScrollbar();
    
    const resizeObserver = new ResizeObserver(updateScrollbar);
    resizeObserver.observe(content);

    return () => {
      content.removeEventListener('scroll', handleScroll);
      resizeObserver.disconnect();
    };
  }, [contentRef, updateScrollbar]);

  const handleThumbMouseDown = useCallback((e: MouseEvent) => {
    e.preventDefault();
    const content = contentRef.current;
    if (!content) return;

    setIsDragging(true);
    dragStartRef.current = { y: e.clientY, scrollTop: content.scrollTop };

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!dragStartRef.current || !contentRef.current) return;
      
      const deltaY = moveEvent.clientY - dragStartRef.current.y;
      const content = contentRef.current;
      const { scrollHeight, clientHeight } = content;
      const maxScrollTop = scrollHeight - clientHeight;
      const thumbRange = clientHeight - thumbHeight;
      const scrollRatio = deltaY / thumbRange;
      
      content.scrollTop = dragStartRef.current.scrollTop + (scrollRatio * maxScrollTop);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
      dragStartRef.current = null;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [contentRef, thumbHeight]);

  const handleTrackClick = useCallback((e: MouseEvent) => {
    const content = contentRef.current;
    if (!content || e.target !== e.currentTarget) return;

    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect();
    const clickY = e.clientY - rect.top;
    const { scrollHeight, clientHeight } = content;
    const clickRatio = clickY / clientHeight;
    
    content.scrollTop = (scrollHeight - clientHeight) * clickRatio;
  }, [contentRef]);

  return {
    thumbHeight,
    thumbTop,
    isDragging,
    showScrollbar,
    handleThumbMouseDown,
    handleTrackClick
  };
}

function Plugin() {
  const [message, setMessage] = useState('');
  const mainScrollRef = useRef<HTMLDivElement>(null);
  const customScrollbar = useCustomScrollbar(mainScrollRef);

  useEffect(() => {
    // Listen for messages from backend
    on('example-event', (data: any) => {
      console.log('Received:', data);
    });
  }, []);

  const handleSubmit = () => {
    emit('submit-message', { message });
  };

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      overflow: 'hidden',
      backgroundColor: 'var(--figma-color-bg)'
    }}>
      <div className="custom-scroll-container" style={{ flex: 1, position: 'relative' }}>
        <div 
          ref={mainScrollRef}
          className="custom-scroll-content"
          style={{ paddingBottom: '16px' }}
        >
          <Container space="medium">
            <Stack space="medium">
              <Text style={{ 
                fontSize: '13px', 
                fontWeight: '600',
                lineHeight: '20px'
              }}>
                My Plugin
              </Text>
              
              <Stack space="small">
                <Text style={{ 
                  fontSize: '11px', 
                  fontWeight: '500',
                  lineHeight: '16px'
                }}>
                  Enter Message
                </Text>
                <Textbox
                  value={message}
                  placeholder="Type something..."
                  onValueInput={setMessage}
                />
              </Stack>

              <Button onClick={handleSubmit} fullWidth>
                Submit
              </Button>
            </Stack>
          </Container>
        </div>
        
        {customScrollbar.showScrollbar && (
          <div 
            className={`custom-scrollbar-track ${customScrollbar.isDragging ? 'dragging' : ''}`}
            onClick={customScrollbar.handleTrackClick as any}
          >
            <div 
              className={`custom-scrollbar-thumb ${customScrollbar.isDragging ? 'dragging' : ''}`}
              style={{ 
                height: `${customScrollbar.thumbHeight}px`,
                top: `${customScrollbar.thumbTop}px`
              }}
              onMouseDown={customScrollbar.handleThumbMouseDown as any}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default render(Plugin);
