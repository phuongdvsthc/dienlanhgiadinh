import { Microwave, RotateCw, Wrench, Snowflake, WashingMachine, Sun } from 'lucide-react';

const categories = [
  {
    title: 'Đĩa xoay lò vi sóng',
    description: 'Đa dạng kích thước, phù hợp nhiều thương hiệu.',
    icon: <Microwave size={32} className="text-primary" />,
    colSpan: 'col-span-2',
    rowSpan: 'row-span-2',
    isLarge: true,
  },
  {
    title: 'Vòng xoay và trục xoay',
    icon: <RotateCw size={24} className="text-muted group-hover:text-primary transition-colors" />,
  },
  {
    title: 'Linh kiện lò vi sóng',
    icon: <Wrench size={24} className="text-muted group-hover:text-primary transition-colors" />,
  },
  {
    title: 'Linh kiện máy lạnh',
    icon: <Snowflake size={24} className="text-muted group-hover:text-primary transition-colors" />,
  },
  {
    title: 'Linh kiện máy giặt',
    icon: <WashingMachine size={24} className="text-muted group-hover:text-primary transition-colors" />,
  },
  {
    title: 'Thiết bị năng lượng mặt trời',
    description: 'Pin năng lượng và phụ kiện đi kèm.',
    icon: <Sun size={28} className="text-muted group-hover:text-secondary transition-colors" />,
    colSpan: 'col-span-2 md:col-span-1 lg:col-span-2',
    isHorizontal: true,
  }
];

export function CategoryGrid() {
  return (
    <section className="bg-surface py-20">
      <div className="max-w-[1280px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-primary mb-10 text-center tracking-tight">Danh mục sản phẩm</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          
          {categories.map((cat, index) => {
            if (cat.isLarge) {
              return (
                <a key={index} href="#" className={`${cat.colSpan} ${cat.rowSpan} bg-surface-lowest p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/30 flex flex-col justify-between group`}>
                  <div>
                    <div className="bg-primary/5 w-16 h-16 rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary/10 transition-colors">
                      {cat.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-surface-foreground mb-3">{cat.title}</h3>
                    <p className="text-muted leading-relaxed hidden sm:block">{cat.description}</p>
                  </div>
                  <div className="mt-6 flex items-center text-primary font-semibold text-sm gap-1 group-hover:gap-2 transition-all">
                    Xem tất cả <span aria-hidden="true">&rarr;</span>
                  </div>
                </a>
              );
            }
            
            if (cat.isHorizontal) {
              return (
                <a key={index} href="#" className={`${cat.colSpan} bg-surface-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/30 flex flex-col justify-center group`}>
                  <div className="flex items-center gap-5">
                    <div className="bg-surface-variant w-14 h-14 rounded-xl flex items-center justify-center group-hover:bg-secondary/10 transition-colors shrink-0">
                      {cat.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-surface-foreground mb-1">{cat.title}</h3>
                      <p className="text-sm text-muted hidden sm:block">{cat.description}</p>
                    </div>
                  </div>
                </a>
              );
            }

            return (
              <a key={index} href="#" className="bg-surface-lowest p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border/30 flex flex-col gap-4 group">
                <div className="bg-surface-variant w-12 h-12 rounded-xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  {cat.icon}
                </div>
                <h3 className="font-bold text-surface-foreground leading-tight">{cat.title}</h3>
              </a>
            );
          })}
          
        </div>
      </div>
    </section>
  );
}
