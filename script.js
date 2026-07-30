const username = "MuhammadIsmael";

const repository = "mawaqit-iraq-launcher-Releases";


const apiUrl =
    `https://api.github.com/repos/${username}/${repository}/releases`;



async function loadReleases() {

    const container =
        document.getElementById(
            "releases"
        );


    try {


        const response =
            await fetch(
                apiUrl
            );


        if (!response.ok) {

            throw new Error(
                "Unable to load releases"
            );

        }


        const releases =
            await response.json();


        container.innerHTML =
            "";


        releases.forEach(
            (
                release,
                index
            ) => {


                createReleaseCard(
                    release,
                    index
                );


            }
        );


    } catch (error) {


        container.innerHTML = `

            <div class="loading">

                Unable to load releases.

            </div>

        `;


        console.error(
            error
        );

    }

}



function createReleaseCard(
    release,
    index
) {


    const container =
        document.getElementById(
            "releases"
        );


    const isLatest =
        index === 0;


    const releaseDate =
        new Date(
            release.published_at
        ).toLocaleDateString(
            "en-GB",
            {
                year:
                    "numeric",

                month:
                    "long",

                day:
                    "numeric"
            }
        );


    const assets =
        release.assets;


    let apkHtml =
        "";


    assets.forEach(
        (
            asset
        ) => {


            if (
                asset.name
                .toLowerCase()
                .endsWith(
                    ".apk"
                )
            ) {


                const size =
                    formatFileSize(
                        asset.size
                    );


                apkHtml += `

                    <div class="download-box">


                        <div class="file-info">


                            <span class="file-icon">

                                📦

                            </span>


                            <div>

                                <div class="file-name">

                                    ${asset.name}

                                </div>


                                <div class="file-size">

                                    ${size}

                                </div>

                            </div>


                        </div>


                        <a

                            class="download-button"

                            href="${asset.browser_download_url}"

                        >

                            ↓ &nbsp; Download

                        </a>


                    </div>

                `;

            }

        }
    );


    const card =

        document.createElement(
            "div"
        );


    card.className =
        "release-card";


    card.innerHTML = `


        <div class="release-header">


            <div>


                <span class="release-number">

                    ${release.name || release.tag_name}

                </span>


                <h2 class="release-title">

                    ${release.name || release.tag_name}

                </h2>


                <p class="release-date">

                    Released ${releaseDate}

                </p>


            </div>


            ${
                isLatest

                ?

                `<span class="latest-badge">

                    ★ LATEST

                </span>`

                :

                `<span class="release-badge">

                    RELEASE

                </span>`
            }


        </div>


        <div class="download-area">

            ${apkHtml}

        </div>


        <details class="release-notes">


            <summary>

                ▶ &nbsp; Release notes

            </summary>


            <p>

                ${
                    release.body
                    ||
                    "No release notes available."
                }

            </p>


        </details>


    `;


    container.appendChild(
        card
    );

}



function formatFileSize(
    bytes
) {


    if (
        bytes === 0
    ) {

        return "0 MB";

    }


    const mb =
        bytes /
        (
            1024 *
            1024
        );


    return mb.toFixed(
        1
    ) + " MB";

}



loadReleases();
