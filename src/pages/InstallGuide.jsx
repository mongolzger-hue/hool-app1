import { Link } from 'react-router-dom';

export default function InstallGuide() {
  return (
    <div className="install-page">
      <div className="container section">
        <div className="install-header card">
          <h1>📱 Апп татах заавар</h1>
          <p>Орцхон вэбсайтыг гар утсандаа суулгаснаар яг л апп шиг хурдан, хялбар ашиглах боломжтой.</p>
        </div>

        <div className="install-grid">
          {/* iOS Section */}
          <div className="install-card card">
            <div className="os-header">
              <span className="os-icon">🍎</span>
              <h2>iPhone / iOS</h2>
            </div>
            <div className="step-list">
              <div className="step-item">
                <div className="step-badge">1</div>
                <p>Safari хөтөч дээр <strong>Ortskhon.mn</strong>-г нээнэ.</p>
              </div>
              <div className="step-item">
                <div className="step-badge">2</div>
                <p>Доор байрлах <strong>"Хуваалцах" (Share)</strong> товч дээр дарна. </p>
                <div className="btn-icon">⎙</div>
              </div>
              <div className="step-item">
                <div className="step-badge">3</div>
                <p>Цэвэр гарч ирэхэд <strong>"Add to Home Screen"</strong> (Үндсэн дэлгэцэнд нэмэх) сонголтыг дарна.</p>
              </div>
              <div className="step-item">
                <div className="step-badge">4</div>
                <p>Дээр байрлах <strong>"Add"</strong> товчийг дарж дуусгана.</p>
              </div>
            </div>
          </div>

          {/* Android Section */}
          <div className="install-card card">
            <div className="os-header">
              <span className="os-icon">🤖</span>
              <h2>Android / Chrome</h2>
            </div>
            <div className="step-list">
              <div className="step-item">
                <div className="step-badge">1</div>
                <p>Chrome хөтөч дээр <strong>Ortskhon.mn</strong>-г нээнэ.</p>
              </div>
              <div className="step-item">
                <div className="step-badge">2</div>
                <p>Баруун дээд буланд байрлах <strong>гурван цэг (⋮)</strong> дээр дарна.</p>
              </div>
              <div className="step-item">
                <div className="step-badge">3</div>
                <p><strong>"Install App"</strong> эсвэл <strong>"Add to Home Screen"</strong> сонголтыг дарна.</p>
              </div>
              <div className="step-item">
                <div className="step-badge">4</div>
                <p>Баталгаажуулах цонхонд <strong>"Install"</strong> товчийг дарж дуусгана.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="install-footer">
          <Link to="/" className="btn btn-primary">Нүүр хуудас руу буцах</Link>
        </div>
      </div>
    </div>
  );
}
