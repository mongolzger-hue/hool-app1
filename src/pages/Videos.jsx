import { useState } from 'react';
import YouTube from 'react-youtube';
import { videos, videoCategories } from '../data/videos';

export default function Videos() {
  const [activeCategory, setActiveCategory] = useState('Бүгд');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredVideos = videos.filter((v) => {
    const matchCategory =
      activeCategory === 'Бүгд' || v.category === activeCategory;
    const matchSearch =
      !searchQuery ||
      v.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      v.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  const playerOpts = {
    width: '100%',
    height: '100%',
    playerVars: {
      autoplay: 0,
      modestbranding: 1,
      rel: 0,
    },
  };

  return (
    <>
      <div className="page-header">
        <div className="container">
          <h1>🎬 Хоол Хийх Бичлэг</h1>
          <p>YouTube дээрх Монгол хоол хийх бичлэгүүдийг үзнэ үү</p>
        </div>
      </div>

      <section className="section" style={{ paddingTop: 'var(--space-xl)' }}>
        <div className="container">
          {/* Search */}
          <div style={{ maxWidth: 500, margin: '0 auto var(--space-xl)' }}>
            <input
              type="text"
              placeholder="🔍 Бичлэг хайх..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 24px',
                borderRadius: 'var(--radius-xl)',
                fontSize: 'var(--text-base)',
              }}
            />
          </div>

          {/* Category Filters */}
          <div className="video-filters">
            {videoCategories.map((cat) => (
              <button
                key={cat}
                className={`video-filter ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Video Grid */}
          {filteredVideos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: 'var(--space-3xl)' }}>
              <p
                style={{
                  fontSize: 'var(--text-xl)',
                  color: 'var(--color-text-muted)',
                }}
              >
                😕 Бичлэг олдсонгүй
              </p>
            </div>
          ) : (
            <div className="videos-grid">
              {filteredVideos.map((video) => (
                <div key={video.id} className="video-card">
                  <div className="video-player-wrapper">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                  <div className="video-card-body">
                    <h3 className="video-title">{video.title}</h3>
                    <p className="video-desc">{video.description}</p>
                    <span className="video-category-badge">{video.category}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
