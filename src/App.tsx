import { FormEvent, useMemo, useState } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BriefcaseBusiness,
  ClipboardList,
  FileSearch,
  Handshake,
  Landmark,
  LayoutList,
  MessageSquareText,
  Scale,
  ScrollText,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import './App.css';

type Post = {
  id: number;
  title: string;
  field: string;
  serviceType: string;
  budget: string;
  description: string;
  status: string;
  createdAt: string;
};

type Service = {
  id: string;
  name: string;
  summary: string;
  audience: string;
  price: string;
  tags: string[];
  icon: typeof FileSearch;
};

const initialPosts: Post[] = [
  {
    id: 1,
    title: '新能源电池结构专利申请前评估',
    field: '新能源',
    serviceType: '专利检索与申请',
    budget: '￥8,000 - ￥15,000',
    description: '已有技术交底书，希望评估新颖性并确认申请策略。',
    status: '等待服务方响应',
    createdAt: '刚刚更新',
  },
  {
    id: 2,
    title: '高校实验室成果寻找转化合作方',
    field: '生物医药',
    serviceType: '技术转让',
    budget: '面议',
    description: '涉及检测方法相关发明专利，计划寻找企业落地与许可合作。',
    status: '3 家机构已沟通',
    createdAt: '2 小时前',
  },
  {
    id: 3,
    title: '企业产品上市前侵权风险排查',
    field: '智能制造',
    serviceType: '专利布局与风控',
    budget: '￥20,000 起',
    description: '产品即将发布，需要针对核心部件做 FTO 检索和风险建议。',
    status: '专家初筛中',
    createdAt: '今天 09:30',
  },
];

const services: Service[] = [
  {
    id: 'search',
    name: '专利检索',
    summary: '围绕技术方案、竞品和法律状态做检索分析，辅助判断可申请性。',
    audience: '发明人、研发团队、产品立项',
    price: '￥3,000 起',
    tags: ['新颖性判断', '竞品监测', '风险提示'],
    icon: FileSearch,
  },
  {
    id: 'application',
    name: '专利申请',
    summary: '从技术交底、撰写、递交到审查意见答复，匹配专业代理资源。',
    audience: '企业、高校、个人发明人',
    price: '按类型报价',
    tags: ['发明专利', '实用新型', '外观设计'],
    icon: ScrollText,
  },
  {
    id: 'portfolio',
    name: '专利布局',
    summary: '面向产品线和技术路线规划专利组合，形成更完整的保护网。',
    audience: '成长型企业、研发中心',
    price: '咨询后定制',
    tags: ['产品保护', '竞争壁垒', '路线规划'],
    icon: Landmark,
  },
  {
    id: 'invalidity',
    name: '无效与维权',
    summary: '支持专利无效、侵权比对、证据梳理与争议解决前期准备。',
    audience: '法务、知识产权负责人',
    price: '项目制',
    tags: ['无效宣告', '侵权分析', '证据建议'],
    icon: Scale,
  },
  {
    id: 'transfer',
    name: '技术转让',
    summary: '连接专利持有人和产业需求方，推动许可、转让或联合开发。',
    audience: '高校院所、技术公司',
    price: '撮合服务费',
    tags: ['许可合作', '成果转化', '需求匹配'],
    icon: Handshake,
  },
  {
    id: 'advisor',
    name: '企业知识产权顾问',
    summary: '提供长期顾问服务，覆盖制度、流程、培训和重点项目跟进。',
    audience: '中小企业、创新团队',
    price: '月度/年度方案',
    tags: ['流程建设', '培训辅导', '长期陪伴'],
    icon: BriefcaseBusiness,
  },
];

const stages = ['创意阶段', '技术交底', '准备申请', '已授权', '交易/维权'];
const fields = ['新能源', '智能制造', '生物医药', '电子信息', '材料化工', '其他领域'];
const serviceTypes = services.map((service) => service.name);
const budgets = ['￥3,000 以下', '￥3,000 - ￥8,000', '￥8,000 - ￥20,000', '￥20,000 起', '面议'];

const scrollToSection = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
};

function App() {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const [selectedService, setSelectedService] = useState(services[1].id);
  const [form, setForm] = useState({
    title: '',
    stage: stages[1],
    field: fields[0],
    serviceType: serviceTypes[1],
    budget: budgets[2],
    description: '',
  });
  const [submittedTitle, setSubmittedTitle] = useState('');

  const currentService = useMemo(
    () => services.find((service) => service.id === selectedService) ?? services[0],
    [selectedService],
  );

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const title = form.title.trim();
    const description = form.description.trim();

    if (!title || !description) {
      setSubmittedTitle('');
      return;
    }

    const nextPost: Post = {
      id: Date.now(),
      title,
      field: form.field,
      serviceType: form.serviceType,
      budget: form.budget,
      description: `${description}（当前阶段：${form.stage}）`,
      status: '新需求待匹配',
      createdAt: '刚刚发布',
    };

    setPosts((current) => [nextPost, ...current]);
    setSubmittedTitle(title);
    setForm((current) => ({ ...current, title: '', description: '' }));
    window.setTimeout(() => scrollToSection('posts'), 120);
  };

  return (
    <div className="app">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="知桥专利交流平台首页">
          <span className="brand-mark">知</span>
          <span>
            <strong>知桥</strong>
            <small>专利交流与服务撮合</small>
          </span>
        </a>
        <nav className="nav-links" aria-label="主导航">
          <button type="button" onClick={() => scrollToSection('posts')}>
            需求大厅
          </button>
          <button type="button" onClick={() => scrollToSection('services')}>
            服务项目
          </button>
          <button type="button" onClick={() => scrollToSection('publish')}>
            发布需求
          </button>
          <button type="button" onClick={() => scrollToSection('contact')}>
            联系咨询
          </button>
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-copy">
            <span className="eyebrow">
              <ShieldCheck size={16} />
              面向企业、发明人和科研团队
            </span>
            <h1>让专利需求被看见，让专业服务更快达成交易。</h1>
            <p>
              在同一个页面发布专利需求、浏览服务项目、匹配检索申请、布局风控、转让维权等资源，
              用清晰流程推动沟通和合作。
            </p>
            <div className="hero-actions">
              <button className="primary-action" type="button" onClick={() => scrollToSection('publish')}>
                发布专利需求
                <ArrowRight size={18} />
              </button>
              <button className="secondary-action" type="button" onClick={() => scrollToSection('services')}>
                选择专利服务
              </button>
            </div>
            <div className="hero-metrics" aria-label="平台关键指标">
              <div>
                <strong>6 类</strong>
                <span>核心专利服务</span>
              </div>
              <div>
                <strong>24h</strong>
                <span>需求初步响应</span>
              </div>
              <div>
                <strong>1 页</strong>
                <span>完成发布与选择</span>
              </div>
            </div>
          </div>
          <div className="hero-visual" aria-label="专利交流服务撮合示意图">
            <img src="/patent-exchange.svg" alt="专利服务撮合平台示意图" />
            <div className="visual-note">
              <BadgeCheck size={18} />
              服务方根据领域、预算和阶段响应需求
            </div>
          </div>
        </section>

        <section className="process-strip" aria-label="交易撮合流程">
          {['发布需求', '服务方响应', '沟通确认', '达成交易'].map((step, index) => (
            <div className="process-step" key={step}>
              <span>{index + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </section>

        <section className="section section-split" id="publish">
          <div className="section-heading">
            <span className="eyebrow">
              <ClipboardList size={16} />
              发布需求
            </span>
            <h2>把专利问题说清楚，系统即时生成需求帖。</h2>
            <p>
              用最少字段描述技术领域、服务类型和预算范围，便于代理机构、顾问或产业方快速判断是否适合承接。
            </p>
          </div>

          <form className="publish-form" onSubmit={handleSubmit}>
            <label>
              需求标题
              <input
                required
                value={form.title}
                onChange={(event) => setForm({ ...form, title: event.target.value })}
                placeholder="例如：智能传感器结构专利申请策略咨询"
              />
            </label>
            <div className="form-grid">
              <label>
                专利阶段
                <select
                  value={form.stage}
                  onChange={(event) => setForm({ ...form, stage: event.target.value })}
                >
                  {stages.map((stage) => (
                    <option key={stage}>{stage}</option>
                  ))}
                </select>
              </label>
              <label>
                技术领域
                <select
                  value={form.field}
                  onChange={(event) => setForm({ ...form, field: event.target.value })}
                >
                  {fields.map((field) => (
                    <option key={field}>{field}</option>
                  ))}
                </select>
              </label>
              <label>
                服务类型
                <select
                  value={form.serviceType}
                  onChange={(event) => setForm({ ...form, serviceType: event.target.value })}
                >
                  {serviceTypes.map((serviceType) => (
                    <option key={serviceType}>{serviceType}</option>
                  ))}
                </select>
              </label>
              <label>
                预算范围
                <select
                  value={form.budget}
                  onChange={(event) => setForm({ ...form, budget: event.target.value })}
                >
                  {budgets.map((budget) => (
                    <option key={budget}>{budget}</option>
                  ))}
                </select>
              </label>
            </div>
            <label>
              需求说明与联系方式
              <textarea
                required
                value={form.description}
                onChange={(event) => setForm({ ...form, description: event.target.value })}
                placeholder="描述技术方向、希望解决的问题、时间要求，或留下可联系信息。"
                rows={5}
              />
            </label>
            <button className="primary-action full-width" type="submit">
              生成需求帖
              <ArrowRight size={18} />
            </button>
            {submittedTitle && <p className="form-success">已发布“{submittedTitle}”，可在需求大厅查看。</p>}
          </form>
        </section>

        <section className="section" id="posts">
          <div className="section-heading compact">
            <span className="eyebrow">
              <LayoutList size={16} />
              需求大厅
            </span>
            <h2>最新专利需求</h2>
          </div>
          <div className="post-grid">
            {posts.map((post) => (
              <article className="post-card" key={post.id}>
                <div className="post-card-head">
                  <span>{post.field}</span>
                  <small>{post.createdAt}</small>
                </div>
                <h3>{post.title}</h3>
                <p>{post.description}</p>
                <div className="post-meta">
                  <span>{post.serviceType}</span>
                  <span>{post.budget}</span>
                </div>
                <div className="post-footer">
                  <strong>{post.status}</strong>
                  <button type="button" onClick={() => scrollToSection('contact')}>
                    咨询对接
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section" id="services">
          <div className="section-heading compact">
            <span className="eyebrow">
              <Sparkles size={16} />
              服务项目
            </span>
            <h2>选择适合当前阶段的专利服务</h2>
          </div>
          <div className="service-layout">
            <div className="service-grid">
              {services.map((service) => {
                const Icon = service.icon;
                const isSelected = service.id === selectedService;
                return (
                  <button
                    className={`service-card ${isSelected ? 'selected' : ''}`}
                    type="button"
                    key={service.id}
                    onClick={() => setSelectedService(service.id)}
                    aria-pressed={isSelected}
                  >
                    <span className="service-icon">
                      <Icon size={22} />
                    </span>
                    <strong>{service.name}</strong>
                    <small>{service.price}</small>
                    <p>{service.summary}</p>
                  </button>
                );
              })}
            </div>
            <aside className="service-detail" aria-live="polite">
              <span className="eyebrow">
                <MessageSquareText size={16} />
                已选择服务
              </span>
              <h3>{currentService.name}</h3>
              <p>{currentService.summary}</p>
              <dl>
                <div>
                  <dt>适用对象</dt>
                  <dd>{currentService.audience}</dd>
                </div>
                <div>
                  <dt>报价方式</dt>
                  <dd>{currentService.price}</dd>
                </div>
              </dl>
              <div className="tag-list">
                {currentService.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <button className="primary-action full-width" type="button" onClick={() => scrollToSection('publish')}>
                围绕该服务发布需求
                <ArrowRight size={18} />
              </button>
            </aside>
          </div>
        </section>

        <section className="contact-band" id="contact">
          <div>
            <span className="eyebrow">
              <Handshake size={16} />
              联系咨询
            </span>
            <h2>需要人工协助匹配？留下需求后进入初筛。</h2>
            <p>平台原型当前不接入真实客服，建议通过“发布需求”模拟完整对接路径。</p>
          </div>
          <button className="secondary-action light" type="button" onClick={() => scrollToSection('publish')}>
            去发布需求
          </button>
        </section>
      </main>
    </div>
  );
}

export default App;
