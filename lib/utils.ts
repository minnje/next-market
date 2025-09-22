export function formatToWon(price: number) {
     return price.toLocaleString("ko-KR");
}

export function formatToTimeAgo(date: string) {
     const dayInMs = 1000 * 60 * 60 * 24;
     const time = new Date(date).getTime();
     const now = new Date().getTime();
     const diff = Math.round((time - now) / dayInMs);
     const formatter = new Intl.RelativeTimeFormat("ko");
     const dayResult = formatter.format(diff, "days");
     if (dayResult === "0일 전") {
          return "오늘";
     }
     return dayResult;
}
