export type Content = {
    image: string,
    content: string[]
}
export type Link = {
    url: string,
    type: 'Site'|'Git'
}
export type WorkType = {
    projectId: string,
    projectNm: string,
    mainImg: string,
    period: string,
    skills: string[],
    contents: Content[],
    link?: Link[],
    color: string
}

const works:WorkType[] = [
    {
        projectId: 'todolist',
        projectNm: 'ha0 Todo',
        mainImg: '/images/works/todo/todoTitle.png',
        period: '2023-01 ~ 2023-01',
        skills: ['TypeScript', 'React', 'Redux', 'Antd'],
        contents: [
            {
                image:'/images/works/todo/todoTag.png',
                content: ['투두 입력/저장기능', '유효성 검사기능', '태그 추가기능', '태그색 지정기능', '태그 중복검사기능'],
            },
            {
                image:'/images/works/todo/todoCheck.png',
                content: ['투두 체크기능', '투두 진행률을 프로그레스바로 표현'],
            },
            {
                image:'/images/works/todo/todoEdit.png',
                content: ['투두 수정기능', '태그 컴포넌트 재사용하여 수정시에도 태그를 추가/수정할 수 있도록 구현'],
            },
            {
                image:'/images/works/todo/todoDelete.png',
                content: ['투두 삭제기능'],
            },
            {
                image:'/images/works/todo/todoFilter.png',
                content: ['투두 날짜별 조회기능', '전주/차주 이동하여 날짜를 선택할 수 있도록 구현', '전체보기/미완료/태그별 필터기능'],
            },
            {
                image:'/images/works/todo/todoSearch.png',
                content: ['투두 검색기능'],
            },
            {
                image:'/images/works/todo/todoOverdue.png',
                content: ['기한이 지난 투두 목록 표시기능', '지난 날짜 계산하여 표시해주도록 구현'],
            },
            {
                image:'/images/works/todo/todoTimeline.png',
                content: ['투두 레이아웃 변경기능', '타임라인으로 시간별로 정렬하도록 구현', '타임라인 체크기능 구현'],
            },
            {
                image:'/images/works/todo/todoNight.png',
                content: ['투두 테마 변경기능'],
            },
        ],
        link: [
            {
                type: 'Site',
                url: 'https://carrotpieowo.github.io/'
            }, 
            {
                type: 'Git',
                url: 'https://github.com/carrotpieOwO/todo_react_type'
            }
        ],
        color: 'rgb(235, 84, 145)'
    },
    {
        projectId: 'dataArchive',
        projectNm: 'Data Archive',
        mainImg: '',
        period: '2주',
        skills: ['javascript', 'angularJS', 'd3.js'],
        contents: [
            {
                image:'',
                content: ['이것은 archive입니다.']
            }
        ],
        color: 'rgb(235, 47, 150)'
    },
    {
        projectId: 'vocManager',
        projectNm: 'VOC Manager',
        mainImg: '',
        period: '2주',
        skills: ['javascript', 'angularJS'],
        contents: [
            {
                image:'',
                content: ['이것은 Voc입니다.']
            }
        ],
        color: 'rgb(235, 47, 150)'
    },
    {
        projectId: 'ktsat',
        projectNm: 'KTSAT VNMS',
        mainImg: '',
        period: '2021-05 ~ 2021-12',
        skills: ['javascript', 'AGgrid', 'Chart.js'],
        contents: [
            {
                image:'',
                content: ['이것은 Ktsat입니다.']
            }
        ],
        color: 'rgb(235, 47, 150)'
    },
    {
        projectId: 'eexi',
        projectNm: '한국선급 EEXI',
        mainImg: '',
        period: '2021-01 ~ 2021-03',
        skills: ['javascript', 'jQuery', 'c3.js', 'DevExtreme'],
        contents: [
            {
                image:'',
                content: ['이것은 eexi 입니다.']
            }
        ],
        color: 'rgb(235, 47, 150)'
    }
]

export default works;