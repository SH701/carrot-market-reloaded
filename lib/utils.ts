export function formatToTime(date: string): string {
    const now = new Date().getTime();
    const past = new Date(date).getTime();
    const diffMs = past - now;
  
    const diffSec = Math.round(diffMs / 1000);
    const diffMin = Math.round(diffSec / 60);
    const diffHour = Math.round(diffMin / 60);
    const diffDay = Math.round(diffHour / 24);
  
    const rtf = new Intl.RelativeTimeFormat("ko", { numeric: "auto" });
  
    if (Math.abs(diffMin) < 60) {
      return rtf.format(diffMin, "minute"); 
    } else if (Math.abs(diffHour) < 24) {
      return rtf.format(diffHour, "hour"); 
    } else {
      return rtf.format(diffDay, "day"); 
  }
}

export function formatToWon(price:number){
    return price.toLocaleString('ko-KR')
}