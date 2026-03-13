export interface CertifiedStudent {
    id: number;
    name: string;
    institution: string;
    score: string;
    image?: string;
}

export const certifiedStudents: CertifiedStudent[] = [
    { id: 1, name: "Achal Tembre", institution: "RTMNU", score: "97%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773379406/lwmuw3twkrltm1nu7ael.jpg" },
    { id: 2, name: "Rasika Parwate", institution: "RTMNU Campus College", score: "93%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773379485/pjj9hyjcnbgcaleijdhm.jpg" },
    { id: 3, name: "Swati Ramteke", institution: "Omega Heathcare Solutions Banglore", score: "92%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773379531/wmfjqnikr7w0qhaph7lz.jpg" },
    { id: 4, name: "Twinkle Bhaisare", institution: "Shree Sainath College Of Pharmacy", score: "88%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773379553/auztdj2csytvpjolbu34.jpg" },
    { id: 5, name: "Disha Kawale", institution: "RTMNU Campus College", score: "88%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773379631/fvpmlp73g1jvophyw8yn.jpg" },
    { id: 6, name: "Jyotirmayi Saulakhe", institution: "Sainath College Nagpur", score: "87%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381362/wnkxjcjqjsikr4bdhq01.jpg" },
    { id: 7, name: "Pratiksha Channe", institution: "RTMNU Campus College", score: "87%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381473/m39glmbeiyrgqq5rxidi.jpg" },
    { id: 8, name: "Disha Nandanwar", institution: "Sevadal mahila Home Science College", score: "86%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381516/vehwuriqvrdcwuwum4nk.jpg" },
    { id: 9, name: "Samiksha Mehare", institution: "AAPC Certified", score: "85%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381563/ppe0o1crssf5zimw30zt.jpg" },
    { id: 10, name: "Ritik Motghare", institution: "Sevadal mahila Home Science College", score: "85%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381615/gm2usfn1ujgwjcsckqjw.jpg" },
    { id: 11, name: "Issac Raut", institution: "William Carey University", score: "84%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381696/lkcrx8dlolluyknxjlzr.jpg" },
    { id: 12, name: "Yogeshwari Umate", institution: "RTMNU Campus College", score: "84%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381746/vfmry1zvdwncd5vi4zx0.jpg" },
    { id: 13, name: "Ritu Tiwari", institution: "Kamla Nehru College Nagpur", score: "84%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381746/vfmry1zvdwncd5vi4zx0.jpg" },
    { id: 14, name: "Shreya Deshmukh", institution: "Brijlal Biyani Science College Amravati", score: "84%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381839/mjjmfsoljqlyhz5on2zr.jpg" },
    { id: 15, name: "Suraj Wankhede", institution: "Sonekar College Of Pharmacy", score: "84%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773381878/hk6737tfnnpxd37zjplp.jpg" },
    { id: 16, name: "Teena Chaple", institution: "Sewadal Mahila Mahavidyalaya", score: "84%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382204/mcpzuzvhqp6k9jtjqr2e.jpg" },
    { id: 17, name: "Sampada Wasekar", institution: "Sevadal Mahila Mahavidyalaya", score: "83%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382676/qsirdzhhqi0pvx8hqjol.jpg" },
    { id: 18, name: "Achal Kamble", institution: "AAPC Certified", score: "83%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382010/umeer1qblnzkfw1fdaa9.jpg" },
    { id: 19, name: "Ritik Bhende", institution: "Shree Sainath College Of Pharmacy", score: "81%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382248/qzfip14ismhyyc7kqxfh.jpg" },
    { id: 20, name: "Prachi Kamble", institution: "AAPC Certified", score: "81%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382281/ls60yckhdyzdou9vrbgk.jpg" },
    { id: 21, name: "Ankita Fulzele", institution: "RTMNU Campus", score: "80%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382316/qzjqpb7kovgtyliitane.jpg" },
    { id: 22, name: "Trupti Sakhare", institution: "Gajanan Maharaj College Of Pharmacy", score: "80%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382355/gmt5oxrtvbdjgrwt15nh.jpg" },
    { id: 23, name: "Vaishnavi Tumsare", institution: "DBC Science", score: "80%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382382/vnkuhoyg8ocsjfujnm7s.jpg" },
    { id: 24, name: "Garima Chauhan", institution: "AAPC Certified", score: "80%", image: "https://res.cloudinary.com/dxsz4pcbj/image/upload/v1773382412/jphmx6swnmtrh6srkq1d.jpg" },
];
