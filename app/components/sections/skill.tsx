import { Box, Typography, Grid, Paper } from '@mui/material';
import SkillCard from '../ui/skill-card';
import { skills } from '@/app/lib/data/skills';
import SectionContainer from '../ui/section-container';
import StarIcon from '@mui/icons-material/Star';

export default function Skills() {
    const levelDescriptions = [
        { level: 1, description: "基礎知識があり、ドキュメントを参照しながら使用できる" },
        { level: 2, description: "基本的な機能を理解し、調べながら実装できる" },
        { level: 3, description: "実践的な経験があり、自身のプロジェクトで活用できる" },
        { level: 4, description: "深い理解があり、他の技術と組み合わせて応用できる" },
        { level: 5, description: "高度な知識があり、他者にアドバイスができる" },
    ];

    return (
        <SectionContainer
            title="Skills"
            sectionid="skills"
            align="left"
            color="#ff9800"
            textcolor="white"
        >
            <Box sx={{ p: 4 }}>
                {/* レベル説明 */}
                <Paper 
                    elevation={0}
                    sx={{ 
                        p: 2, 
                        mb: 4, 
                        backgroundColor: 'rgba(255, 152, 0, 0.05)',
                        border: '1px solid rgba(255, 152, 0, 0.1)'
                    }}
                >
                    <Typography variant="h6" gutterBottom sx={{ color: 'warning.main' }}>
                        スキルレベルの説明
                    </Typography>
                    <Grid container spacing={2}>
                        {levelDescriptions.map(({ level, description }) => (
                            <Grid item xs={12} sm={6} md={4} key={level}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Box sx={{ display: 'flex' }}>
                                        {[...Array(level)].map((_, i) => (
                                            <StarIcon 
                                                key={i} 
                                                sx={{ 
                                                    color: 'warning.main',
                                                    fontSize: '1rem'
                                                }} 
                                            />
                                        ))}
                                    </Box>
                                    <Typography variant="body2">
                                        {description}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>

                {/* スキルカードグリッド */}
                <Grid container spacing={3}>
                    {skills.map((skill) => (
                        <Grid item xs={12} sm={6} md={4} key={skill.id}>
                            <SkillCard skill={skill} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </SectionContainer>
    );
}